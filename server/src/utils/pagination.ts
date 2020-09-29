export interface PaginationArgs {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
}

export function relayToPrismaPagination(
  args: PaginationArgs,
): { cursor?: { id: string }; take?: number; skip?: number } {
  const { first, last, before, after } = args;

  // If no pagination set, don't touch the args
  if (!first && !last && !before && !after) {
    return {};
  }

  /**
   * This is currently only possible with js transformation on the result. eg:
   * after: 1, last: 1
   * ({
   *   cursor: { id: $before },
   *   take: Number.MAX_SAFE_INTEGER,
   *   skip: 1
   * }).slice(length - $last, length)
   */
  if (after && last) {
    throw new Error('after and last can\'t be set simultaneously');
  }

  /**
   * This is currently only possible with js transformation on the result. eg:
   * before: 4, first: 1
   * ({
   *   cursor: { id: $before },
   *   take: Number.MIN_SAFE_INTEGER,
   *   skip: 1
   * }).slice(0, $first)
   */
  if (before && first) {
    throw new Error('before and first can\'t be set simultaneously');
  }

  // Edge-case: simulates a single `before` with a hack
  if (before && !first && !last && !after) {
    return {
      cursor: { id: before },
      skip: 1,
      take: Number.MIN_SAFE_INTEGER,
    };
  }

  const take = resolveTake(first, last);
  const cursor = resolveCursor(before, after);
  const skip = resolveSkip(cursor);

  const newArgs = {
    take,
    cursor,
    skip,
  };

  return newArgs;
}

function resolveTake(
  first: number | null | undefined,
  last: number | null | undefined,
): number | undefined {
  if (first && last) {
    throw new Error('first and last can\'t be set simultaneously');
  }

  if (first) {
    if (first < 0) {
      throw new Error('first can\'t be negative');
    }

    return first;
  }

  if (last) {
    if (last < 0) {
      throw new Error('last can\'t be negative');
    }

    if (last === 0) {
      return 0;
    }

    return last * -1;
  }

  return undefined;
}

function resolveCursor(
  before: string | null | undefined,
  after: string | null | undefined,
) {
  if (before && after) {
    throw new Error('before and after can\'t be set simultaneously');
  }

  if (before) {
    return { id: before };
  }

  if (after) {
    return { id: after };
  }

  return undefined;
}

function resolveSkip(cursor: { id: string } | null | undefined) {
  if (cursor) {
    return 1;
  }

  return undefined;
}
