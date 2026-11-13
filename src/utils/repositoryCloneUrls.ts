export const buildGitCloneCommand = (cloneUrl: string) => `git clone ${cloneUrl}`

/** Deep link gestito da VS Code (e dai fork che espongono lo stesso handler) per clonare una repository e aprirla. */
export const buildVsCodeCloneUrl = (cloneUrl: string) => `vscode://vscode.git/clone?url=${encodeURIComponent(cloneUrl)}`

/**
 * Deep link gestito da JetBrains Toolbox / IntelliJ IDEA per fare il checkout di una repository e aprirla.
 * `idea.required.plugins.id` fa sì che l'IDE abiliti il plugin Git prima del checkout.
 */
export const buildIntelliJCloneUrl = (cloneUrl: string) => `jetbrains://idea/checkout/git?idea.required.plugins.id=Git4Idea&checkout.repo=${encodeURIComponent(cloneUrl)}`
