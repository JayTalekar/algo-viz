
const isSafe=(grid,row,col,N)=>
{
   let i,j;
   for(i=0;i<col;i++)
   {
       if(grid[i].isQueenPresent)
       {
           
           return false
       }
   }
   for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (grid[i].isQueenPresent)
       return false;
    
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
       if (grid[i].isQueenPresent)
           return false;
    
    return true;
      
}
const solveTill=(grid,col,N)=>
{
   if(col>=N)
   {
       alert("final solution");
       return;
   }
   for(let i=0;i<N;i++)
   {
       if(isSafe(grid,i,col,N)){
           grid[i].isQueenPresent=true;

           if(solveTill(grid,col+1,N))
           {
             return true;
           }
           
        grid[i].isQueenPresent=false;
       }
   }

  //
    return false;
}
const Queen=(grid,N)=>{
    
    let val=solveTill(grid,0,N)
   
    if(solveTill(grid,0,N)===false) {
        alert("solution is not possible");
        return;
    }
    
}
export {Queen}