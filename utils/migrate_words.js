export const place_words_on_grid = (words) => {
    const Grid = Array.from({ length: 10 }, () => Array(10).fill(0));
    let dir = ['h', 'v', 'd']
    words.forEach(word => {
        for (let attemp = 0; attemp < 100; attemp++) {
            let rand_dir = dir[Math.floor(Math.random() * 3)]; // 0 - 2
            let x_min = 0, x_max, y_min = 0, y_max;
            if (rand_dir == 'h') {
                x_max = 10 - word.length;
                y_max = 9;
            } else if (rand_dir == 'v') {
                x_max = 9;
                y_max = 10 - word.length
            } else {
                x_max = 10 - word.length
                y_max = 10 - word.length
            }
            let rand_x = Math.floor(Math.random() * (x_max - x_min + 1)) + x_min
            let rand_y = Math.floor(Math.random() * (y_max - y_min + 1)) + y_min;
            let curen_x = rand_x, curen_y = rand_y;
            let error = false;

            // check if we can place the word first
            for (let i = 0; i < word.length; i++) {
                if (curen_x > 9 || curen_y > 9 || Grid[curen_y][curen_x] != 0) {
                    console.log("error out of boundery");
                    error = true;
                }
                if (rand_dir == 'h') {
                    curen_x++;
                } else if (rand_dir == 'v') {
                    curen_y++;
                } else {
                    curen_x++;
                    curen_y++;
                }
            }
            if (error) continue;
            curen_x = rand_x, curen_y = rand_y;
            for (let i = 0; i < word.length; i++) {
                if (curen_x > 9 || curen_y > 9 || Grid[curen_y][curen_x] != 0) {
                    console.log("error out of boundery");
                    error = true;
                }
                Grid[curen_y][curen_x] = word[i];
                if (rand_dir == 'h') {
                    curen_x++;
                } else if (rand_dir == 'v') {
                    curen_y++;
                } else {
                    curen_x++;
                    curen_y++;
                }
            }
            break;
        }
    });

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (Grid[i][j] == 0) {
                let ascii = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
                let char = String.fromCharCode(ascii);
                Grid[i][j] = char
            }
        }
    }
    // convert them to upper
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (Grid[i][j] != 0) {
                Grid[i][j] = Grid[i][j].toUpperCase()
            }
        }
    }
    return Grid;
}