export type HireStatus = "available" | "open_to_work" | "unavailable";

const HIRE_STATUSES: HireStatus[] = ["available", "open_to_work", "unavailable"];

function parseHireStatus(value: string | undefined): HireStatus {
  if (value && HIRE_STATUSES.includes(value as HireStatus)) {
    return value as HireStatus;
  }

  return "available";
}

export const hireStatus = parseHireStatus(process.env.NEXT_PUBLIC_HIRE_STATUS);
export const showSalary = process.env.NEXT_PUBLIC_SHOW_SALARY === "true";
