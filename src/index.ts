import {
	getBlockUidsAndTextsReferencingPage,
	getCurrentPageUid,
	getPageTitleByBlockUid,
	createBlock,
	toRoamDateUid,
	getShallowTreeByParentUid
 } from 'roam-client';

 //
 // constants
 //
 const HEADING = "Daily zettles";
 const ZETTLE_TAG = "zettles";
 const NUM_ZETTLES = 3;


 //
 // helpers
 //

 const getTodayPageUid = () : string => toRoamDateUid(new Date())

 // Get a list of titles that reference the page with the title `pageTitle`
 const getTitlesReferencePage = (pageTitle: string) : string[] =>
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

const getZettleTitles = (): string[] => {
  const titles = getTitlesReferencePage(ZETTLE_TAG);
  return sample(NUM_ZETTLES, titles);
};

const zettlesArePresent = () : boolean => {
	const tree = getShallowTreeByParentUid(getTodayPageUid());
	console.log(tree);
	return tree[0].text === HEADING;
}

//
// The main logic
//
const main = (): void => {
  if (zettlesArePresent()) return;

  const text = HEADING;
  const children: { text: string }[] = getZettleTitles().map((z) => {
    const text = `[[${z}]]`;
    return { text };
  });
  const parentUid = getTodayPageUid();

  createBlock({
    node: { text, children },
    parentUid,
  });
};

main();