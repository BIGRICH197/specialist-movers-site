# Local development (Desktop copy)

**Use this folder, not OneDrive:**

`C:\Users\richa\Desktop\specialist-movers1`

OneDrive sync locks `.next` and causes `EBUSY` / 500 Internal Server Error. Keep the project on Desktop (or another non-synced path).

## Start dev server

```bash
npm run dev:clean
```

Opens **http://localhost:3020** (deletes `.next` first, then starts).

Legacy port 3010: `npm run dev:clean:3010`

If the port is stuck:

```powershell
Get-NetTCPConnection -LocalPort 3020 | Select OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
npm run dev:clean
```

## Page looks broken / unstyled (no purple layout)

The HTML loaded but **CSS did not** , usually a stale `.next` folder after hot reload (`layout.css` 404 or `Cannot find module './948.js'`).

1. Stop the dev terminal (Ctrl+C).
2. Run `npm run clean` then `npm run dev:3010` (or `npm run dev:clean`).
3. Hard refresh the browser (Ctrl+Shift+R).

Do not refresh repeatedly while the terminal is still compiling.

## Open in Cursor

File → Open Folder → `C:\Users\richa\Desktop\specialist-movers1`
