import { FormControl } from '@angular/forms';

export function restrictedWords(words) {
    return (control:FormControl) : { [key:string]:any } => {
        if(!words){ return null; }
        var wordsFound = words
            .map(word=>control.value.includes(word)?word:null)
            .filter(word=>word!=null);
        return wordsFound && wordsFound.length > 0 
                ? {'restrictedWords': wordsFound.join(', ') } 
                : null;
        }        
} 

