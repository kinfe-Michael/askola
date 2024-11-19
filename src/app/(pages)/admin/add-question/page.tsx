"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { addQuestionAction } from "@/controllers/actions/addQuestionAction";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function AddQuestionPage() {
  const { register, reset, handleSubmit } = useForm();
  const [examType,setExamType] = useState<'mid' | 'final' | 'unknown'>('unknown')
  const onSubmit = handleSubmit(async (data) => {
    data.examType = examType
    const res = await addQuestionAction(data);
    if (res?.error) {
      toast.error("something went wrong");
    }
    if (!res?.error) {
      toast.success("sussesfully added");
      reset();
    }
  });
  return (
    <div className="p-2 bg-gray-100">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <p className="text-sm">Question Data</p>
        <Input className="mb-0" required {...register("question")} placeholder="Question" />
        <Input {...register("answer")} placeholder="Answer optional" />
        <p className="text-sm">Question Info</p>
        <Input {...register("university")} placeholder="University" />
        <div className="flex gap-2">
          <Input {...register("year")} placeholder="Year" />
          <Input required {...register("subject")} placeholder="Subject code" />
        </div>
        <Select  onValueChange={(value)=> {
            if(value !== 'mid' && value !== 'final' && value !== 'unknown') return
            setExamType(value)
        }} >
            <SelectTrigger>
                Exam Type
            </SelectTrigger>
            <SelectContent >
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
        </Select>

        <div className="flex flex-col gap-2 p-2">
          <p className="text-sm">
            Choices <span className="text-xs text-gray-400">optional</span>{" "}
          </p>
          <Input {...register("a")} placeholder="A" />
          <Input {...register("b")} placeholder="B" />
          <Input {...register("c")} placeholder="C" />
          <Input {...register("d")} placeholder="D" />
          <Input {...register("e")} placeholder="E" />
          <Input {...register("f")} placeholder="F" />
        </div>

        <Button className="bg-green-400 text-white text-lg font-extrabold">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddQuestionPage;
