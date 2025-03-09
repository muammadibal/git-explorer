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
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/theme";

export default function FormSearch() {
    const {theme} = useThemeStore()
    const formik: FormikProps<IFormik> = useFormik<IFormik>({
        initialValues: {
            isLoading: false,
            search: "",
            runSearch: false,
            activeColumns: []
        },
        onSubmit(values, formikHelpers) {
            
        },
    })
    
    const {data, status, fetchStatus, refetch, isPending, isFetchingNextPage, hasNextPage, fetchNextPage, isError, error} = usersRequest(20, formik.values.search)
    const itData: IUser[] = data?.pages?.flatMap((page: {
        nextPage: number;
        data: IUser[]
    }) => page?.data) || [];

    useEffect(() => {
        if(formik.values.runSearch && formik.values.search.length === 0) {
            queryClient.resetQueries({queryKey: ["users"], exact: true})
            // formik.setFieldValue("isLoading", false)
            formik.setFieldValue("runSearch", false)
        } 
    }, [formik])
    
    useEffect(() => {
        if(isError) {
            toast.error(error?.message)
            // formik.setFieldValue("isLoading", false)
        }
    }, [isError])

    const onChange = (key: string | string[]) => formik.setFieldValue("activeColumns", key);
    
    return (
        <div className="flex items-center justify-center py-20">
            <motion.div
                className={`w-[60%] md:w-[80%] shadow-xl !p-2 rounded-lg ${theme === 'dark' ? "bg-slate-600" : "bg-white"} transition-all duration-400`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
            >
                <Form onFinish={() => {
                    formik.setFieldValue("runSearch", true)
                    refetch()
                }}>
                    <div className="flex gap-4">
                        <Input 
                            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear value={formik.values.search} onChange={(e) => formik.setFieldValue("search", e.target.value)} placeholder="Search here..."/>
                        <Button type="primary" variant="filled" onClick={() => {
                            formik.setFieldValue("runSearch", true)
                            refetch()
                        }}>Search</Button>
                    </div>
                    {formik.values.runSearch && itData.length > 0 && <div className={`${theme === 'dark' ? "text-white" : "text-black"} transition-all duration-400`}>Showing users for "{formik.values.search}"</div>}
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 500,
                            overflow: 'auto',
                        }}
                    >
                    {isPending ? Array(8).fill("").map(_ => <div key={Math.random().toString()} className="mx-4 mt-4 mb-2">
                        <Skeleton avatar paragraph={{ rows: 1 }} active />
                    </div>) : 
                        <InfiniteScroll
                            dataLength={itData.length}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={<Skeleton className="mx-4" avatar paragraph={{ rows: 1 }} active />}
                            // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollThreshold={'50px'}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={itData}
                                renderItem={(item) => <FormSearchCard formik={formik} onChange={onChange} item={item} />}
                            />
                        </InfiniteScroll>}
                    </div>
                </Form>
            </motion.div>
        </div>
    );
}

// "use client"
// import { usersRequest } from "@/repositories/repos";
// import { Button, Collapse, CollapseProps, List, Form, Input, Skeleton, Divider, Avatar } from "antd";
// import { FormikProps, useFormik } from "formik";
// import { useEffect } from "react";
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { queryClient } from "./Layout";
// import FormSearchCard from "./FormSearch.Card";
// import { SearchOutlined } from "@ant-design/icons";
// import { toast } from 'react-toastify';
// import {motion} from 'framer-motion'
// import { fetchUsers } from "@/services/repos";
// import VirtualList from 'rc-virtual-list';

// let containerHeight = 500
// export default function FormSearch() {
//     const formik: FormikProps<IFormik> = useFormik<IFormik>({
//         initialValues: {
//             isLoading: false,
//             isLoadingMore: false,
//             search: "",
//             runSearch: false,
//             data: [],
//             activeColumns: [],
//             page: 1,
//             hasMore: false
//         },
//         onSubmit(values, formikHelpers) {
            
//         },
//     })

//     const loadMoreData = () => {
//         if (formik.values.isLoading || formik.values.isLoadingMore) {
//           return;
//         }
//         if(formik.values.page > 1) formik.setFieldValue("isLoadingMore", true)
//         fetchUsers({pageParam: formik.values.page, limit: 10, search: formik.values.search}).then(res => {
//             console.log('res fetchUsers', res)
//             formik.setFieldValue("data", [...formik.values.data, ...res.data])  
//             if(res.data.length >= 10) {
//                 formik.setFieldValue("page", res.nextPage)
//                 formik.setFieldValue("hasMore", res.data.length >= 10 ? true : false)
//             }
//             formik.setFieldValue("isLoading", false);
//             formik.setFieldValue("isLoadingMore", false)
//         }).catch(err => {
//             formik.setFieldValue("isLoading", false);
//             formik.setFieldValue("hasMore", false)
//             formik.setFieldValue("isLoadingMore", false)
//         })
//     };

//     const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
//         // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
//         console.log('eeeeee', e.currentTarget.scrollHeight, e.currentTarget.scrollTop, containerHeight)
//         if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - containerHeight) <= 1) {
//         //   loadMoreData();
//         }
//     };
    
//     useEffect(() => {
//         if(formik.values.runSearch && formik.values.search.length === 0) {
//             formik.setFieldValue("data", [])
//             formik.setFieldValue("isLoading", false);
//             formik.setFieldValue("runSearch", false);
//             formik.setFieldValue("hasMore", false)

//         }
//         // if(formik.values.runSearch && formik.values.search.length > 0) {
//         //     loadMoreData();
//         // }
//     }, [formik]);
    
//     // const {data, status, fetchStatus, refetch, hasNextPage, fetchNextPage, isError, error} = usersRequest(20, formik.values.search)
//     // const itData: IUser[] = data?.pages?.flatMap((page: {
//     //     nextPage: number;
//     //     data: IUser[]
//     // }) => page?.data) || [];

//     // useEffect(() => {
//     //     if(formik.values.runSearch && formik.values.search.length === 0) {
//     //         queryClient.resetQueries({queryKey: ["users"], exact: true})
//     //         // formik.setFieldValue("isLoading", false)
//     //         formik.setFieldValue("runSearch", false)
//     //     } 
//     //     if(formik.values.runSearch && formik.values.search.length > 0) {
//     //         // formik.setFieldValue("isLoading", true)
//     //         refetch()
//     //     }
//     // }, [formik])
    
//     // useEffect(() => {
//     //     if(isError) {
//     //         toast.error(error?.message)
//     //         // formik.setFieldValue("isLoading", false)
//     //     }
//     // }, [isError])

//     const onChange = (key: string | string[]) => formik.setFieldValue("activeColumns", key);
    
//     return (
//         <div className="flex items-center justify-center py-20">
//             <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ ease: "easeInOut", duration: 0.75 }}
//                 className="w-[60%] md:w-[80%] "
//             >
//                 <Form onFinish={() => {
//                     formik.setFieldValue("runSearch", true)
//                 }} className="shadow-xl !p-2 rounded-lg bg-white">
//                     <div className="flex gap-4">
//                         <Input 
//                             prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
//                             allowClear value={formik.values.search} onChange={(e) => formik.setFieldValue("search", e.target.value)} placeholder="Enter username"/>
//                         <Button type="primary" variant="filled" onClick={() => {
//                             formik.setFieldValue("runSearch", true)
//                         }}>Search</Button>
//                     </div>
//                     {formik.values.runSearch && formik.values.data.length > 0 && <div>Showing users for "{formik.values.search}"</div>}
//                     <div
//                     id="scrollableDiv"
//                     style={{
//                         maxHeight: containerHeight,
//                         overflow: 'auto',
//                     }}>
//                         {formik.values.isLoading ? Array(20).fill("").map(_ => <div key={Math.random().toString()} className="mx-4 mt-4 mb-2">
//                             <Skeleton avatar paragraph={{ rows: 1 }} active />
//                         </div>) : <List>
//                             <VirtualList
//                                 data={formik.values.data}
//                                 height={containerHeight}
//                                 itemKey="login"
//                                 onScroll={onScroll}
//                             >
//                                 {(item: IUser) => (
//                                     <FormSearchCard formik={formik} onChange={onChange} item={item} />
//                                 )}</VirtualList>
//                         </List>}
//                         {formik.values.isLoadingMore && <Skeleton className="mx-4" avatar paragraph={{ rows: 1 }} active />}
//                     </div>
//                 </Form>
//             </motion.div>
//         </div>
//     );
// }
