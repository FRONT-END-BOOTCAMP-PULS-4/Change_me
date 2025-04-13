export class CreateHabit {
    constructor(public name: string, public description: string) {}

    execute() {
        // Logic to create a new habit
        console.log(`Creating habit: ${this.name}`);
        // Additional implementation goes here
    }
}