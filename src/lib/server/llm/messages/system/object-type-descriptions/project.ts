export const projectInterface = `
### Project

a project is a workspace in Vikunja that contains tasks, users, and labels. It can have various properties such as name, description, color, and more. Projects can also have views, which are different ways to visualize the tasks within the project.

\`\`\`ts
interface Project {
    title: string; // The main name of the project, this is what you'll see in the projects list.
    description?: string; // The description of the project, this is what you'll see in the projects list.
    parent_project_id?: number; // The id of the parent project, if this project is a subproject.
    is_archived?: boolean; // True if the project is archived, false otherwise. If not specified, the project is considered active.
    hex_color?: string; // A hex color value associated to the project.
    owner?: {
        id: number; // The user id of the project owner.
        username: string; // The username of the project owner.
        email?: string; // The email of the project owner.
    };
    created?: string; // The date when the project was created.
    updated?: string; // The date when the project was last updated.
    position?: number; // The position of the project in the projects list.
    identifier?: string; // The project identifier, based on the project name and the project index.
    background_information?: {
        blur_hash?: string; // The blur hash of the background image, used for lazy loading the image.
        full_url?: string; // The full URL of the background image.
        thumb_url?: string; // The thumbnail URL of the background image.
        background_image_id?: number; // The id of the background image.
        background_image_url?: string; // The URL of the background image.
    };
}
\`\`\`

`;
