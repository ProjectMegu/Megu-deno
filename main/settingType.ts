export type MeguModuleSetting = {
    dependencies: DependencyData[]
}

export type DependencyData = {
    name: string,
    place: "local",
    url: string
}