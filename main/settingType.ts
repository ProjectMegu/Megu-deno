export type MeguModuleSetting = {
    dependencies: DependencyData[];
};

export type DependencyData = {
    name: string;
    place: "local" | "git" | "repo";
    url: string;
};
