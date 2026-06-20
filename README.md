# anthonyhattar-site
Personal resume and portfolio site.

## Deployment

This repo deploys automatically to GitHub Pages via GitHub Actions.

### Automatic deploy trigger

- Push to `main`
- Or run the workflow manually from the Actions tab

### One-time GitHub setup

1. Open repository Settings -> Pages.
2. Under Build and deployment, set Source to GitHub Actions.
3. Confirm Actions are enabled for this repository.

### Custom domain

- `CNAME` is set to `www.anthony-hattar.com`.
- In your DNS provider, point `www` as a CNAME to `ahattar10.github.io`.
- For root domain forwarding, either:
	- use your DNS/registrar URL forwarding from `anthony-hattar.com` to `https://www.anthony-hattar.com`, or
	- configure ALIAS/ANAME records if your DNS provider supports them for GitHub Pages.

### Notes

- `.nojekyll` is included to ensure static files are published as-is.
- `_headers` is for Netlify-style headers and is not enforced by GitHub Pages.
