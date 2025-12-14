import {z, ZodError} from 'zod';

export function getZodErrorMessages<T>(error: ZodError<T>): string[] {
  const tree = z.treeifyError(error);

  const messages: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function walk(node: any) {
    if (node?.errors?.length) {
      messages.push(...node.errors);
    }

    if (node?.properties) {
      Object.values(node.properties).forEach(walk);
    }

    if (node?.items) {
      node.items.forEach(walk);
    }
  }

  walk(tree);

  return messages;
}