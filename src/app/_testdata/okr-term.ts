import type { OkrTerm } from "@prisma/client";

// TODO: startDateとendDateの型をDateにする
type OkrTermArray = ReadonlyArray<
  Pick<OkrTerm, "id" | "name"> & {
    startDate: string | undefined;
    endDate: string | undefined;
  }
>;

export const createOkrTermMock = (): OkrTermArray => {
  const mockOkrTerms = [];
  let startDate = new Date(2023, 10, 1);

  for (let i = 1; i <= 30; i++) {
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 3,
      0,
    );

    mockOkrTerms.push({
      id: i,
      name: `OKR期間${i}`,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });

    startDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 1);
  }
  return mockOkrTerms;
};
