import { fetchData, templateBuilder, saveToStorage, dataInterpreter, savedOrganizer, controlsBuilder } from './data.js';

async function getData(searchWord) {
    let allSavedData = savedOrganizer(searchWord); 

    if (allSavedData.find(word => word.word == searchWord)) {
        let wordData = allSavedData.find(word => word.word == searchWord);
        templateBuilder("wordOutput", wordData);
        saveToStorage(wordData, "history");
    } else { dataInterpreter(searchWord); controlsBuilder(searchWord); }
};

const model = new MiniZinc.Model();
model.addFile('test.mzn', 'include "alldifferent.mzn";int: S = 3;int: N = S * S;int: digs = ceil(log(10.0,int2float(N))); set of int: PuzzleRange = 1..N;set of int: SubSquareRange = 1..S;start=[|3, 0, 0, 0, 0, 0, 1, 4, 0|0, 0, 1, 0, 8, 4, 0, 5, 0|0, 0, 0, 0, 6, 0, 0, 0, 0|0, 0, 0, 3, 0, 0, 0, 2, 0|0, 0, 4, 6, 0, 0, 0, 0, 0|9, 0, 0, 0, 4, 2, 0, 0, 8|0, 0, 0, 2, 0, 0, 0, 0, 0|0, 7, 0, 0, 0, 0, 0, 0, 9|0, 0, 3, 0, 1, 5, 0, 8, 0|];array[1..N,1..N] of 0..N: start;array[1..N,1..N] of var PuzzleRange: puzzle;constraint forall(i,j in PuzzleRange)(if start[i,j] > 0 then puzzle[i,j] = start[i,j] else true endif );constraint forall (i in PuzzleRange) (alldifferent( [ puzzle[i,j] | j in PuzzleRange ]) ); constraint forall (j in PuzzleRange) (alldifferent( [ puzzle[i,j] | i in PuzzleRange ]) ); constraint forall (a, o in SubSquareRange)(alldifferent( [ puzzle[(a-1) *S + a1, (o-1)*S + o1] | a1, o1 in SubSquareRange ] ) );solve satisfy;output  [ show_int(digs,puzzle[i,j]) ++ " " ++ if j mod S == 0 then " " else "" endif ++if j == N then if i != N then if i mod S == 0 then "\n\n" else "\n" endif else "" endif else "" endif | i,j in PuzzleRange ] ++ ["\n"];');
const solve = model.solve({
  options: {
    solver: 'gecode',
    'all-solutions': true
  }
});
solve.on('solution', solution => {
  console.log(solution.output.json);
});
solve.then(result => {
  console.log(result.status);
});

export {getData};

Handlebars.registerHelper("inc", function(index){
	index += 1;
    return index;
});