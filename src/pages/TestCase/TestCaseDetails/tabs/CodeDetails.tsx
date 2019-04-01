import React, { useEffect, useState } from 'react';
import { getGeneratedTestCase } from "@/api/code-generator.api";
import { useFetcher } from '@/hooks/useFetcher';

interface Params {
    lang: string;
    testCaseId: string;
}

const CodeDetails: React.FunctionComponent<Params> = ({ lang, testCaseId }) => {
    const [code, setCode] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            let result = await getGeneratedTestCase(testCaseId, lang);
            setCode(result);
        };
        fetchData();
    }, [code]);
    return (
        <div>
            {code}
        </div>
    );
};

export default CodeDetails;