# Plan Execute Achieve

Landing page for [planexecuteachieve.com](https://planexecuteachieve.com) — a thought-leadership brand for delivery leaders navigating the shift to AI-native delivery.

## Run locally

Open `index.html` in a browser. No build step required.

For a local server (enables smooth scroll and font loading):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy on Netlify

1. Push this repo to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site > Import an existing project**.
3. Connect your GitHub account and select this repo.
4. Build settings:
   - **Build command:** (leave blank)
   - **Publish directory:** `.`
5. Click **Deploy site**.

Netlify will serve `index.html` as the homepage automatically. No build step needed.

## Structure

```
index.html              Landing page
privacy-policy.html     Privacy policy
assets/images/          Local image assets
```
