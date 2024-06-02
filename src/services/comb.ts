
// rulers
// digits 1 - 9 no repeats
// combinations non repeat
// give variabel l = length, t = total combination
// [1,2,3] == [3,2,1] is same only one should be in the list

// case 1 
// l = 3, t = 6
//output = [[1,2,3]]
// 3 digits with total 6 => 1 + 2 + 3 

//case  2 
// l= 3, t=8
// output = [[1,2,5], [1,3,,4]]
// 3 digits, all off the list total sum = 8 no repeat 

//case  3
// l= 4, t=4
// output = []
// no combination


function combination(l : number, t :number): number[][]{
  const result: number[][] = [];
  const digits = Array.from({ length: 9 }, (_, i) => i + 1);


  function searchComb(idx: number, l:number, t:number, arr: number[]){
    if(arr.length === 1 && t === 0){
      result.push([...arr])
      return 
    }
  }

  return result;

}

