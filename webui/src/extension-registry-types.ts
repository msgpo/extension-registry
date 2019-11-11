/********************************************************************************
 * Copyright (c) 2019 TypeFox
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 ********************************************************************************/

import { createURL } from "./utils";

export interface ExtensionFilter {
    query?: string;
    category?: ExtensionCategory;
    size?: number;
    offset?: number;
    [key: string]: string | number | undefined;
}

export interface ExtensionRaw {
    readonly name: string;
    readonly publisher: string;
    readonly url: string;
    readonly iconUrl?: string;
    readonly displayName?: string;
    readonly version?: string;
    readonly averageRating?: number;
    readonly timestamp?: number;
}
export namespace ExtensionRaw {
    export function getExtensionApiUrl(root: string, extension: ExtensionRaw) {
        const arr = [root, extension.publisher, extension.name];
        return createURL(arr);
    }
}

export interface Extension extends ExtensionRaw {
    readonly error?: string;

    readonly publisherUrl: string;
    readonly reviewsUrl: string;
    readonly downloadUrl: string;

    readonly readmeUrl?: string;

    readonly allVersions: { [key: string]: string };
    readonly preview?: boolean;

    readonly description?: string;
    readonly categories?: string[];

    readonly reviewCount: number;

    readonly tags?: string[];
    readonly license?: string;
    readonly homepage?: string;
    readonly repository?: string;
    readonly bugs?: string;
    readonly markdown?: string;
    readonly galleryColor?: string;
    readonly galleryTheme?: string;
    readonly qna?: string;
    readonly badges?: Badge[];
    readonly dependencies?: ExtensionReference[];
    readonly bundledExtensions?: ExtensionReference[];
}
export namespace Extension {
    export function is(extension: any): extension is Extension {
        return 'allVersions' in extension && 'extensionFileName' in extension;
    }
}

export interface Badge {
    url: string;
    href: string;
    description: string;
}

export interface ExtensionReference {
    publisher: string;
    extension: string;
    version?: string;

}

export type StarNumber = 1 | 2 | 3 | 4 | 5;
export interface ExtensionReview {
    rating: StarNumber;
    title: string;
    comment: string;
    user: string; // ExtensionRegistryUser;
    timestamp?: string;
}

export interface ExtensionReviewList {
    postUrl: string;
    reviews: ExtensionReview[];
}

export interface ExtensionRegistryUser {
    firstName?: string;
    lastName?: string;
    userName: string;
    email?: string;
}

export type ExtensionCategory =
    '' |
    'Programming Languages' |
    'Snippets' |
    'Linters' |
    'Themes' |
    'Debuggers' |
    'Formatters' |
    'Keymaps' |
    'SCM Providers' |
    'Other' |
    'Extension Packs' |
    'Language Packs';