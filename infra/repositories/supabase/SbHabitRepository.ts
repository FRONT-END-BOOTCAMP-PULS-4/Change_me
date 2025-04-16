import {Habit} from "../../../domain/entities/Habit";
import {HabitRepository} from "@/domain/repositories/HabitRepository";
import {HabitFilter} from "@/domain/repositories/filters/HabitFilter";

export class SbHabitRepository implements HabitRepository {
    private habits: Habit[] = [];
    private nextId : number = 1;

    async findAll(filter?: HabitFilter): Promise<Habit[]>{
        if(!filter){
            return this.habits;
        }
        return this.habits.filter(habit => {
            if (filter.memberId && habit.memberId !== filter.memberId){
                return false;
            }
            if (filter.status !== undefined && habit.status !== filter.status){
                return false;
            }
            if (filter.categoryId && habit.categoryId !== filter.categoryId){
                return false;
            }
            return true;
        });
    }
    async findById(id: number): Promise<Habit | null> {
        const habit = this.habits.find(h => h.id === id);
        return habit ? {...habit} : null;
    }
    async save(habit: Habit): Promise<Habit> {
        const newHabit = {
            ...habit,
            id : this.nextId++,  
        };
        this.habits.push(newHabit);
        return newHabit;
    }
    async update(Habit: Habit): Promise<Habit> {
        const index = this.habits.findIndex(h => h.id === Habit.id);
        if (index === -1) {
            throw new Error(`Habit with id ${Habit.id} not found`);
        }
        this.habits[index] = Habit;
        return Habit;
    }
    async deleteById(id: number): Promise<void> {
        const index = this.habits.findIndex(h => h.id === id);
        if (index === -1) {
            throw new Error(`Habit with id ${id} not found`);
        }
        this.habits.splice(index, 1);
    }
}
