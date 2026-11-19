# Git → Oracle VM Sync Guide (`briankuria.co.ke`)

> **Quick Reference:** Whenever you make changes to your portfolio locally, follow these two steps to push your code to GitHub and refresh your live server at **[https://briankuria.co.ke](https://briankuria.co.ke)** without affecting any other apps on `yoby-server`.

---

## How the Sync Logic Works (The Big Picture)

Before looking at the commands, here is **why** the pipeline is designed this way:

1. **GitHub Is the Single Source of Truth (Bridge Between Windows & Linux):**
   Your Windows PC and your Oracle Cloud Linux VM never copy files directly to each other. Instead, your PC pushes clean code snapshots to **GitHub**, and your VM pulls from GitHub. That gives you an instant backup, version history (you can roll back anytime), and zero risk of mismatched half-copied files.
2. **Source Code ≠ Running Website (Why `npm run build` Is Required):**
   What you edit in VS Code (`src/*.tsx`) is human-readable TypeScript/React. Browsers cannot run `.tsx` files directly. Next.js must compile those files into optimized HTML, CSS, and JavaScript inside `.next/`. That is why simply pulling code from GitHub is not enough—the VM must rebuild `.next/` and tell **PM2** to start serving the new bundle.
3. **Why `fetch + reset --hard` Instead of `git pull`:**
   `git pull` tries to *merge* changes, which can fail with merge conflicts if Linux file permissions or Windows line endings (`CRLF` vs `LF`) differ slightly. Because the VM should *never* hold custom unpushed edits, `git fetch` + `git reset --hard origin/main` guarantees `/var/www/briankuria/app` becomes an exact mirror of GitHub every single time.
4. **Why `npm ci` Instead of `npm install`:**
   `npm install` can silently upgrade minor package versions and rewrite `package-lock.json` on the server. `npm ci` strictly installs the exact tested versions from `package-lock.json` and leaves the repository untouched.
5. **Fail-Safe Guardrail (`set -euo pipefail`) & Tenant Isolation:**
   If a build ever has a TypeScript error, `set -euo pipefail` aborts `deploy.sh` *before* touching PM2—so your live site keeps serving the last working build instead of crashing. And targeting `briankuria-web` by name ensures **Tenants 1–10** on `yoby-server` are never interrupted.

---

## Step-by-Step Workflow

### Step 1: Push Your Local Changes to GitHub (From Windows PowerShell)
Run these commands inside `C:\My_Projects\VS Projects\Yobi Portfolio\BMK Portfolio\portfolio`:

```powershell
git add -A
git commit -m "describe your update here"
git push origin main
```

### Step 2: Sync & Refresh the Oracle Cloud VM (One Command)
Once `git push` finishes, run this single command from PowerShell:

```powershell
ssh yoby-server "/var/www/briankuria/deploy.sh"
```

---

## Word-by-Word Command Explanations

### 1. Local Git Commands (Step 1)
```powershell
git add -A
git commit -m "describe your update here"
git push origin main
```
* **`git`**: The version-control program tracking your source files.
* **`add`**: Stages changes so Git knows you want to include them in the next snapshot.
* **`-A`**: Short for `--all` — includes new files, modified files, and deleted files across the entire `portfolio` repository.
* **`commit`**: Saves the staged changes as a permanent snapshot in your local Git history.
* **`-m "..."`**: "Message" — attaches a short human-readable description of what changed.
* **`push`**: Uploads your local committed snapshots to a remote server.
* **`origin`**: The default nickname Git gives to your GitHub repository URL (`https://github.com/softdevbrian/BMK-Portfolio.git`).
* **`main`**: The primary branch name on GitHub that your Oracle VM pulls from.

---

### 2. The Remote VM Sync Command (Step 2)
```powershell
ssh yoby-server "/var/www/briankuria/deploy.sh"
```
* **`ssh`**: ("Secure Shell") Opens an encrypted remote connection from your Windows PC to your Linux server in Frankfurt.
* **`yoby-server`**: The host shortcut in your `~/.ssh/config` file that automatically supplies the server IP (`130.61.9.37`), username (`ubuntu`), and private SSH key.
* **`"/var/www/briankuria/deploy.sh"`**: Tells the VM to immediately execute your portfolio's deployment script and print the progress back into your PowerShell window, then disconnect cleanly.

---

## What Runs Inside `/var/www/briankuria/deploy.sh` (Line-by-Line)

This is the exact script saved on your Oracle VM:

```bash
#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/briankuria/app"
PM2_NAME="briankuria-web"

echo "[1/4] Navigating to $APP_DIR..."
cd "$APP_DIR"

echo "[2/4] Pulling latest changes from GitHub (origin/main)..."
git fetch origin main
git reset --hard origin/main

echo "[3/4] Installing dependencies & building Next.js production bundle..."
npm ci
npm run build

echo "[4/4] Reloading PM2 process ($PM2_NAME)..."
pm2 reload "$PM2_NAME" --update-env
pm2 save

echo "Done! https://briankuria.co.ke is updated and running."
```

### Every Word & Flag Inside `deploy.sh` Explained
* **`#!/usr/bin/env bash`**: ("Shebang") Tells Linux to run this file using the Bash shell.
* **`set -euo pipefail`**: Safety guardrail:
  * `-e`: Exit immediately if *any* command fails (so PM2 never restarts with a broken build).
  * `-u`: Treat unset variables as an error instead of silently expanding to empty text.
  * `-o pipefail`: If any command in a pipeline (`a | b`) fails, mark the whole pipeline as failed.
* **`APP_DIR="/var/www/briankuria/app"`**: Variable storing the exact folder where your Git repository lives on the VM.
* **`PM2_NAME="briankuria-web"`**: Variable storing your portfolio's exact PM2 process name (so other tenants on `yoby-server` are never touched).
* **`echo "..."`**: Prints status messages to your terminal so you can see which step is running.
* **`cd "$APP_DIR"`**: ("Change Directory") Moves into `/var/www/briankuria/app`.
* **`git fetch origin main`**: Downloads the latest commits from the `main` branch on GitHub without altering your files yet.
* **`git reset --hard origin/main`**: Updates all files in `app/` to match GitHub's `origin/main` commit-for-commit (preventing merge conflicts if line endings or permissions ever differed).
* **`npm ci`**: ("Clean Install") Installs the exact locked dependency versions from `package-lock.json` without modifying `package-lock.json`.
* **`npm run build`**: Compiles TypeScript and builds the optimized Next.js production pages into `.next/`.
* **`pm2 reload "$PM2_NAME" --update-env`**:
  * `pm2`: The Node.js process manager keeping your site alive 24/7.
  * `reload`: Gracefully refreshes your Next.js server with minimal/zero downtime.
  * `"$PM2_NAME"`: Targets *only* `briankuria-web` (Tenants 1–10 remain untouched).
  * `--update-env`: Reloads any environment variable updates into the running process.
* **`pm2 save`**: Saves the updated PM2 state to `/home/ubuntu/.pm2/dump.pm2` so it survives server reboots.
