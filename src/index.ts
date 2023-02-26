import {
  getTodayPageUid,
  getRandomSampleofTaggedPages
} from './helpers';

import {
	createBlock,
  createButtonObserver,
	getShallowTreeByParentUid
 } from 'roam-client';

 //
 // constants
 //
 const HEADING = "Daily zettles";
 const ZETTLE_TAG = "zettles";
 const NUM_ZETTLES = 5;


const zettlesArePresent = () : boolean => {
	const tree = getShallowTreeByParentUid(getTodayPageUid());
	return tree[0].text === HEADING;
}

//
// The main logic
//
const main = (): void => {
  if (zettlesArePresent()) return;

  const text = HEADING;

  const children: { text: string }[] = getRandomSampleofTaggedPages(
    ZETTLE_TAG,
    NUM_ZETTLES
  ).map((z) => {
    const text = `[[${z}]]`;
    return { text };
  });

  const parentUid = getTodayPageUid();

  createBlock({
    node: { text, children },
    parentUid,
  });
};

createButtonObserver({
  attribute: "daily-zettles",
  render: (b: HTMLButtonElement) => {
    b.onclick = () => main()
  }
});


main();
