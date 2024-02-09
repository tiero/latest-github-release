import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ASSET_NAME_FORMAT = process.env.ASSET_NAME_FORMAT;

app.get('/latest-release/:name', async (req, res) => {
    try {
        const headers = {};
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }

        const response = await fetch(`https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/releases/latest`, {
            headers: headers
        });
        if (!response.ok) {
            throw new Error("Failed to fetch the latest release from GitHub.");
        }
        
        const releaseData = await response.json();
        const assetName = req.params.name;
        const dmgLink = releaseData.assets.find(asset => asset.name === assetName);
        
        if (dmgLink && dmgLink.browser_download_url) {
            res.redirect(dmgLink.browser_download_url);
        } else {
            res.status(404).send(`Asset with name format "${assetName}" not found in the latest release.`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch the latest release. Please try again later.");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
