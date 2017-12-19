import { JsonObject } from '../json';
import { Project } from './project';

export class PageRef {
	private id: string;
	private name: string;
	private project?: Project;

	public constructor(id: string, name: string, project?: Project) {
		this.id = id;
		this.name = name;
		this.setProject(project);
	}

	/**
	 * Loads and returns a page reference from a given JSON object.
	 * @param jsonObject The JSON object to load from.
	 * @return A new page reference object containing the loaded data.
	 */
	public static fromJsonObject(json: JsonObject, project: Project): PageRef {
		return new PageRef(json.id as string, json.name as string, project);
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getProject(): Project | undefined {
		return this.project;
	}

	public remove(): void {
		this.setProject(undefined);
	}

	public setProject(project?: Project): void {
		if (this.project) {
			this.project.getPagesInternal().remove(this);
		}

		this.project = project;

		if (project) {
			project.getPagesInternal().push(this);
		}
	}

	/**
	 * Serializes the page reference into a JSON object for persistence.
	 * @return The JSON object to be persisted.
	 */
	public toJsonObject(): JsonObject {
		return {
			id: this.id,
			name: this.name
		};
	}
}
