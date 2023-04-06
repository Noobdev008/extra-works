// class Robot {
//   constructor() {
//     this.dir = ['north', 'east', 'south', 'west'];

//     this.direction = 'north';
//     this.x = 0;
//     this.y = 0;
//   }
//   get bearing() {
//     return this.direction
//   }

//   get coordinates() {
//     return [this.x, this.y]
//   }

//   place({ x, y, direction }) {

//     if (!(direction == 'east' || direction == 'north' || direction == 'west' || direction == 'south')) {
//   throw new InvalidInputError();
// }
    
//     this.direction = direction;

//     this.x = x;
//     this.y = y;
//   }

//   evaluate(instructions) {
//     let el = this.dir.indexOf(this.direction);

//     if (instructions.length == 1) {
//       if (instructions == 'R') {
//           el += 1;
//         }
    
//         if (instructions == 'L') {
//           el -= 1;
//         }
    
//         if (instructions == 'A') {
//           if (this.direction == 'north') {
//             this.y += 1;
//           }
//           if (this.direction == 'east') {
//             this.x += 1;
//           }
//           if (this.direction == 'south') {
//             this.y -= 1;
//           }
//           if (this.direction == 'west') {
//             this.x -= 1;
//           }
//         }

//       if (el < 0) {
//         this.direction = this.dir[this.dir.length + el];
//       } else if(el >= this.dir.length) {
//         this.direction = this.dir[el - this.dir.length]
//       } else {
//         this.direction = this.dir[el];
//       }
//     } else {
//       for (let st of instructions) {

//           if (instructions == 'R') {
//             el += 1;
//           }
      
//           if (instructions == 'L') {
//             el -= 1;
//           }
      
//           if (instructions == 'A') {
//             if (this.direction == 'north') {
//               this.y += 1;
//             }
//             if (this.direction == 'east') {
//               this.x += 1;
//             }
//             if (this.direction == 'south') {
//               this.y -= 1;
//             }
//             if (this.direction == 'west') {
//               this.x -= 1;
//             }
//           }

//         if (el < 0) {
//           this.direction = this.dir[this.dir.length + el];
//         } else if(el >= this.dir.length) {
//           this.direction = this.dir[el - this.dir.length]
//         } else {
//           this.direction = this.dir[el];
//         }
          
//       }
//     }
    
//   }
// }
  

//   const robit = new Robot();

//   // robit.evaluate('R');
//   // console.log(robit.bearing);

//   robit.place({ direction: 'east', x: 0, y: 0 });
//   robit.evaluate('R');

//   console.log(robit.bearing);
//   console.log(robit.coordinates);


 const encode = (phrase, key) => {

  let meta = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let result = '';
  
  for (let i = 0; i < phrase.length; i++) {
    result += meta[(key.a * meta.indexOf(phrase[i]) + key.b) % 26];
  }

  return result;

};


console.log(encode('test', {a: 5, b: 7}));


