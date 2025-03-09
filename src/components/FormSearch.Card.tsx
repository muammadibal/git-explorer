"use client";
import { fetchRepos } from '@/services/repos';
import { Avatar, Collapse, Space } from 'antd';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { LoadingOutlined, StarTwoTone } from '@ant-design/icons';
import { Flex, Spin, Badge, Card } from 'antd';
import { useThemeStore } from '@/store/theme';

export default function FormSearchCard({formik, item, onChange}: {formik: FormikProps<IFormik>; item: IUser; onChange: ((key: string[]) => void) | undefined}) {
    const {theme} = useThemeStore()
    const [isLoading, setIsLoading] = useState(false)
    const [itResult, setItResult] = useState<any[] | undefined>([])

    return (
        <Collapse ghost bordered={false} items={[
            {
                showArrow: false,
                key: item.id,
                onClick: async() => {
                    if(!formik.values.activeColumns.includes(item.id.toString())) {
                        setIsLoading(true)
                        try {
                            const res = await fetchRepos({search: item.login})
                            setItResult(res)
                        } catch (error) { }
                        setIsLoading(false)
                    }
                },
                label: <Badge.Ribbon className='' text={item.user_view_type}>
                    <div className={`!w-full flex flex-row items-center gap-4 shadow-sm rounded-lg p-4 ${theme === 'dark' ? "bg-slate-200" : "bg-slate-100"} transition-all duration-400`}>
                        <Avatar onClick={() => {}} src={<img src={item.avatar_url} alt={item.login} />} />
                        <div className={`flex flex-1`}>{item.login}</div>
                    </div>
                </Badge.Ribbon>,
                children: isLoading ? <Flex justify='center' align="center" gap="middle">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex> : itResult?.length === 0 ? null : itResult?.map((repo: IRepos) => (
                <Space key={repo.id.toString()} className={`mb-4 w-[95%] ml-5`} direction="vertical" size={16}>
                    <Card className={`shadow-sm ${theme === 'dark' ? "!bg-slate-200" : "!bg-slate-100"} transition-all duration-400`} title={repo.name} extra={<div className='flex flex-row gap-2 items-center'>
                        <StarTwoTone twoToneColor={"#EBAC2FFF"} />
                        <Badge>{repo.stargazers_count}</Badge>
                    </div>}>
                        <p>{repo.description || "No description available."}</p>
                    </Card>
                </Space>
              ))
            }
        ]} defaultActiveKey={[]} onChange={onChange} />
    )
}
