

import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const HF_TOKEN = "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";
export async function GET(){
const inference = new HfInference(HF_TOKEN);

// Chat completion API
const out = await inference.chatCompletion({
  model: "Qwen/QwQ-32B-Preview",
  messages: [{ role: "user", content: "Explain ai in 415 characters" }], 
  max_tokens:512,

});
 return NextResponse.json({data:out.choices[0].message.content});
}