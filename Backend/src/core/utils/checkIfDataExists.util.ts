export async function checkIfDataExists(
  values: Record<string, string>,
  anyRepository: any,
) {
  const messages: string[] = [];

  const checks = await Promise.all(
    Object.entries(values).map(async ([column, value]) => {
      const exists = await anyRepository.findOne({
        where: { [column]: value },
      });
      if (exists) {
        messages.push(
          `${value} ${column} already exist. Please try a different one.`,
        );
      }
      return exists;
    }),
  );

  const hasDuplicates = checks.some((exists) => exists);
  if (hasDuplicates) {
    throw new Error(messages.join(' '));
  }
}
