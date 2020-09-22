export class Boat {

    static id = 0;

    id: number;

    constructor(
        public name: string,
        public description: string,
        public photoPath?: string
        ) {
            this.id = Boat.id;
            Boat.id++;
        }
}
