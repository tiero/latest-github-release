const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;
const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_REPO = process.env.GITHUB_REPO;
const ASSET_NAME_FORMAT = process.env.ASSET_NAME_FORMAT;

app.get('/latest-release', async (req, res) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/releases/latest`);
        if (!response.ok) {
            throw new Error("Failed to fetch the latest release from GitHub.");
        }
        
        const releaseData = await response.json();
        const version = releaseData.tag_name.slice(1); // Remove 'v' from version, like '0.0.29'
        
        const formattedAssetName = ASSET_NAME_FORMAT.replace('{version}', version);
        const dmgLink = releaseData.assets.find(asset => asset.name === formattedAssetName);
        
        if (dmgLink && dmgLink.browser_download_url) {
            res.redirect(dmgLink.browser_download_url);
        } else {
            res.status(404).send(`Asset with name format "${formattedAssetName}" not found in the latest release.`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch the latest release. Please try again later.");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
