module.exports = themeOptions => {
  const basePath = themeOptions.basePath || `/`
  const pagesPath = themeOptions.pagesPath || `content/pages`
  const postsPath = themeOptions.postsPath || `content/posts`
  const projectsPath = themeOptions.projectsPath || `content/projects`
  const assetPath = themeOptions.assetPath || `content/assets`

  return {
    basePath,
    pagesPath,
    postsPath,
    projectsPath,
    assetPath,
  }
}