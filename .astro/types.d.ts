declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"100-days-of-code-experience/index.md": {
  id: "100-days-of-code-experience/index.md",
  slug: "100-days-of-code-experience",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"100-days-of-code/index.md": {
  id: "100-days-of-code/index.md",
  slug: "100-days-of-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"a-new-ending/index.md": {
  id: "a-new-ending/index.md",
  slug: "a-new-ending",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"career-moves-2022/index.md": {
  id: "career-moves-2022/index.md",
  slug: "career-moves-2022",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"display-password-form-input/index.md": {
  id: "display-password-form-input/index.md",
  slug: "display-password-form-input",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"first-day-at-learnfactory/index.md": {
  id: "first-day-at-learnfactory/index.md",
  slug: "first-day-at-learnfactory",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"first-stackoverflow-question/index.md": {
  id: "first-stackoverflow-question/index.md",
  slug: "first-stackoverflow-question",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"git-switch/index.md": {
  id: "git-switch/index.md",
  slug: "git-switch",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hello-world/index.md": {
  id: "hello-world/index.md",
  slug: "hello-world",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hide-vue-code-production/index.md": {
  id: "hide-vue-code-production/index.md",
  slug: "hide-vue-code-production",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"number-facts-generator/index.md": {
  id: "number-facts-generator/index.md",
  slug: "number-facts-generator",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tech-to-learn-2020/index.md": {
  id: "tech-to-learn-2020/index.md",
  slug: "tech-to-learn-2020",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"things-i-dont-know-2019/index.md": {
  id: "things-i-dont-know-2019/index.md",
  slug: "things-i-dont-know-2019",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"using-concurrently/index.md": {
  id: "using-concurrently/index.md",
  slug: "using-concurrently",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"year-in-review-2017/index.md": {
  id: "year-in-review-2017/index.md",
  slug: "year-in-review-2017",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"year-in-review-2018/index.md": {
  id: "year-in-review-2018/index.md",
  slug: "year-in-review-2018",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"year-in-review-2019/index.md": {
  id: "year-in-review-2019/index.md",
  slug: "year-in-review-2019",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
