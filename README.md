# 🚀 Latest Release Downloader 🚀

Fetch the latest GitHub release of a project and generate a download link using a customizable template!

---

## 📖 About

The **Latest Release Downloader** is a server-side tool designed to seamlessly integrate with platforms like Squarespace. It fetches the latest release of a specified GitHub repository and generates a download link based on a customizable template. The tool is versatile and supports the `{version}` placeholder to ensure you always get the desired asset format from the release.

---

## 🛠️ Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/tiero/latest-github-release
   ```

2. Navigate into the directory:

   ```bash
   cd latest-github-release
   ```

3. Install the dependencies:

   ```bash
   yarn install
   ```

---

## 🔧 Configuration

1. Set up your environment variables in the `.env` file:

```sh
  GITHUB_ORG=your-github-organization
  GITHUB_REPO=your-github-repository
  ASSET_NAME_FORMAT=YourAssetName_{version}.ext
```

Replace placeholders with your actual GitHub organization, repository name, and desired asset name format.

2. Remember to ensure the `{version}` placeholder is appropriately positioned in the `ASSET_NAME_FORMAT` to be replaced by the release version.

---

## 🚀 Usage

1. Start the server:

   ```bash
   node index.js
   ```

2. Direct your platform or service to query:

   ```
   https://your-server-address/latest-release
   ```

   This will redirect to the latest release's download link based on your asset name configuration.

---

## 🙌 Contribution

Contributions, issues, and feature requests are welcome! Feel free to check the [issues](./issues) page.

---

## 📝 License

[Public domain](LICENSE).
