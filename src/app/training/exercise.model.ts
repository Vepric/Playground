export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date; // ? pravi ovu promenljivu opcionalnom
  state?: "completed" | "cancelled" | null; //promenljiva moze da ima ove 3 vrednosti ( odvajamo ih pipe-om |)
}
