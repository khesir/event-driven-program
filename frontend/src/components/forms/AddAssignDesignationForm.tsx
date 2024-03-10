import {
    Form,
    FormControl,
    FormField,
    FormItem,

  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { AssignDesignation } from "@/schemas"
import { z } from "zod"
import { DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllDesignation } from "@/controller/designation"
import { Designation } from "@/lib/types"
import { submitAssignDesignation } from "@/controller/assigned"


export function AddAssignDesignationForm(){
    const [designation, setdesignation] = useState<Designation[]>([]);
    const { id } = useParams<{ id: string }>();
    const {toast} = useToast();

    useEffect(()=> {
        handleData();
    }, [])

    const handleData = async() => {
        try {
            const response = await getAllDesignation()
            console.log(response)
            setdesignation(response);
        }catch(error){
            console.log(error)
        }
    }

    const form = useForm<z.infer<typeof AssignDesignation>>({
        defaultValues: {
            employee:{
                id: id
            },
            designation:{
                id: "",
                designationName: "",
            },
            employeeType:  "",
            status:  ""
        }
    });
    const handleSubmit = (data: z.infer<typeof AssignDesignation>) => {
        const newData = {
           employeeType: data.employeeType,
           status: data.status,
           employee:{
            id: data.employee.id,
           },
           designation: {
            id:(() => {
                const matchingDesignation = designation.find(
                  (d) => d.designationName === data.designation.designationName
                );
            
                return matchingDesignation ? matchingDesignation.id : null;
              })()|| null, 
           }
        }
        toast({
            variant: "default",
            title: "Data Added, Kindly Refresh the page",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                </pre>
              ),
        })
        console.log(newData)// Pass the updated employeeData object to the sumbitEmployeeData function
        submitAssignDesignation(newData)
    }
    
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="designation.designationName" className="text-right"> Designation name </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="designation.designationName"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a designation" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {designation.map((d,i) =>(
                                                 <SelectItem key={i} value={d.designationName}>{d.designationName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="employeeType" className="text-right"> Employee Type </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="employeeType"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a employee type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Regular">Regular</SelectItem>
                                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                                            <SelectItem value="Probation">Probation</SelectItem>
                                            <SelectItem value="Probation">Dropped</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right"> Status </Label>
                    <div className=" col-span-3">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Resigned">Resigned</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
            <div>
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </div>
            </div>
        </form>
    </Form>
    
  )
}
