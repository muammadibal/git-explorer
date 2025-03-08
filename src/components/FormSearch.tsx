"use client"
import { usersRequest } from "@/repositories/repos";
import { Button, Collapse, CollapseProps, List, Form, Input, Skeleton, Divider, Avatar } from "antd";
import { FormikProps, useFormik } from "formik";
import { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { queryClient } from "./Layout";
import FormSearchCard from "./FormSearch.Card";
import { SearchOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';

export default function FormSearch() {
    const formik: FormikProps<IFormik> = useFormik<IFormik>({
        initialValues: {
            search: "",
            runSearch: false,
            activeColumns: []
        },
        onSubmit(values, formikHelpers) {
            
        },
    })
    
    const {data, status, fetchStatus, refetch, hasNextPage, fetchNextPage, isError, error} = usersRequest(20, formik.values.search)
    const itData: IUser[] = data?.pages?.flatMap((page: {
        nextPage: number;
        data: IUser[]
    }) => page?.data) || [];

    useEffect(() => {
        if(formik.values.runSearch && formik.values.search.length === 0) {
            queryClient.resetQueries({queryKey: ["users"], exact: true})
            formik.setFieldValue("runSearch", false)
        } 
        if(formik.values.runSearch && formik.values.search.length > 0) {
            refetch()
        }
    }, [formik])
    
    useEffect(() => {
        if(isError) {
            toast.error(error?.message)
        }
    }, [isError])

    const onChange = (key: string | string[]) => formik.setFieldValue("activeColumns", key);
    
    return (
        <div className="flex items-center justify-center py-20">
            <Form onFinish={() => {
                formik.setFieldValue("runSearch", true)
            }} className="w-[40%] shadow-xl !p-2 rounded-lg bg-white">
                <div className="flex gap-4">
                    <Input 
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        allowClear value={formik.values.search} onChange={(e) => formik.setFieldValue("search", e.target.value)} placeholder="Enter username"/>
                    <Button type="primary" variant="filled" onClick={() => {
                        formik.setFieldValue("runSearch", true)
                    }}>Search</Button>
                </div>
                {formik.values.runSearch && itData.length > 0 && <div>Showing users for "{formik.values.search}"</div>}
                {fetchStatus === 'fetching' ? Array(5).fill("").map(_ => <div className="mx-4 mt-4 mb-2">
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                </div>) : <InfiniteScroll
                    dataLength={itData.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<Skeleton className="mx-4" avatar paragraph={{ rows: 1 }} active />}
                    // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={itData}
                        renderItem={(item) => <FormSearchCard formik={formik} onChange={onChange} item={item} />}
                    />
                </InfiniteScroll>}
            </Form>
        </div>
    );
}
