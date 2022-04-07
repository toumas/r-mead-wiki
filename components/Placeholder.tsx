import tw from "twin.macro";
import { Stack } from "./Stack/Stack";

export function Placeholder() {
  return (
    <div className="h-28 animate-pulse">
      <Stack vertical={true} mb={tw`mb-3`} items={tw`items-start`}>
        <div className="h-6 w-2/3 rounded-md bg-brand-bright-black"></div>
        <div className="h-6 w-full rounded-md bg-brand-bright-black"></div>
      </Stack>
    </div>
  );
}
