export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
    id: string; // uuid
    title: string;
    status: TaskStatus; // three statuses (todo | inprogress | done)
    employee_id: string | null; // (foreign key -> employeeid nullable)
    created_at : string;
};