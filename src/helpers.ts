import {
	getBlockUidsAndTextsReferencingPage,
	getPageTitleByBlockUid,
	toRoamDateUid,
 } from 'roam-client';

 //
 // helpers
 //

 export const getTodayPageUid = () : string => toRoamDateUid(new Date())

 // Get a list of titles that reference the page with the title `pageTitle`
export const getTitlesReferencePage = (pageTitle: string) : string[] =>
	getBlockUidsAndTextsReferencingPage(pageTitle)
		.map((b) => b.uid )
		.map(getPageTitleByBlockUid)

// Return a number between 0 and n-1
const rand = (n: number) : number =>
	Math.random() * n | 0  // '| 0' converts it to int

// sample n values from string[]
const sample = (n: number, vals: string[]): string[] => {
	if(n > vals.length) throw new Error(`n > size of vals`);

  const indexes: Set<number> = new Set();

	// keep sampling until we get the right amount of indexes
  while (indexes.size < n) {
    const i = rand(vals.length);
    indexes.add(i);
  }

	// dereference the array
  return [...indexes].map((i) => vals[i]);
};

export const getRandomSampleofTaggedPages = (tag : string, n: number): string[] => {
  const titles = getTitlesReferencePage(tag);
  return sample(n, titles);
};
