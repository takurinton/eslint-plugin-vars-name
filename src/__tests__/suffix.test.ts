import { suffix } from "../rules";
import { afterAll, describe, it } from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("vars-name/suffix", suffix, {
  valid: [
    // propsの別名は`xxxProp`という命名にする(arrow function)
    {
      filename: "Component.tsx",
      code: "const Component = ({ name: nameProp }: { name: string }) => <div>{nameProp}</div>;",
    },
    // propsの別名は`xxxProp`という命名にする(function)
    {
      filename: "Component.tsx",
      code: "function Component({ name: nameProp }: { name: string }) { return <div>{nameProp}</div>; }",
    },
    // .tsファイルは対象外
    {
      filename: "foo.ts",
      code: "const foo = ({ name: foo }: { name: string }) => foo;",
    },
  ],
  invalid: [
    // propsの別名が`xxxProp`という命名になっていない(arrow function)
    {
      filename: "Component.tsx",
      code: "const Component = ({ name: foo }: { name: string }) => <div>{foo}</div>;",
      errors: [
        {
          messageId: "suffix",
        },
      ],
    },
    // propsの別名が`xxxProp`という命名になっていない(function)
    {
      filename: "Component.tsx",
      code: "function Component({ name: foo }: { name: string }) { return <div>{foo}</div>; }",
      errors: [
        {
          messageId: "suffix",
        },
      ],
    },
  ],
});
