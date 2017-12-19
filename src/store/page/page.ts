import { JsonObject } from '../json';
import { PageElement } from './page_element';
import { Store } from '../store';

export class Page {
	private name: string;
	private id: string;
	private root?: PageElement;

	public constructor(id: string, store: Store) {
		this.id = id;
		this.name = 'New Page';
	}

	/**
	 * Loads and returns a page from a given JSON object.
	 * @param jsonObject The JSON object to load from.
	 * @return A new page object containing the loaded data.
	 */
	public static fromJsonObject(json: JsonObject, id: string, store: Store): Page {
		const page = new Page(id, store);
		page.name = json.name as string;
		page.root = PageElement.fromJsonObject(json.root as JsonObject, store);

		return page;
	}

	public getName(): string {
		return this.name;
	}

	public getId(): string {
		return this.id;
	}

	public getRoot(): PageElement {
		return this.root as PageElement;
	}

	/**
	 * Serializes the page into a JSON object for persistence.
	 * @return The JSON object to be persisted.
	 */
	public toJsonObject(): JsonObject {
		return { name: this.name, root: this.root ? this.root.toJsonObject() : undefined };
	}
}
