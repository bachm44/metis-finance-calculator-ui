import {Box, Button, Container} from '@material-ui/core';
import React, {useState} from 'react';
import {InvestmentInfo} from './InvestmentInfo/InvestmentInfo';
import {NavBar} from '../../components/NavBar/NavBar';
import {buttonBox} from './InvestmentView.styles';
import {InvestmentParameters, InvestmentResultTypes, PeriodUnit} from './InvestmentView.types';

const defaultCurrency = '$';
export const CurrencyContext = React.createContext(defaultCurrency);

const mockedResults: InvestmentResultTypes = {
    annualChangePercent: 12,
    annualChange: 256,
    totalChangePercent: 12,
    totalChange: 256,
    predictedChange: 2400,
};

const mockedParameters: InvestmentParameters = {
    initialDeposit: 1800,
    systematicDeposit: 40,
    frequency: 3,
    frequencyUnit: PeriodUnit.WEEKS,
    duration: 2,
    durationUnit: PeriodUnit.DAYS,
    ROE: 20,
};

interface Props {}

export const InvestmentView = (props: Props) => {
    const [submitting, setSubmitting] = useState(false);
    const [parameters, setParameters] = useState<InvestmentParameters>(mockedParameters);

    const onSubmit = async () => {
        setSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setSubmitting(false);
        console.log(parameters);
    };

    return (
        <React.Fragment>
            <CurrencyContext.Provider value={defaultCurrency}>
                <NavBar />
                <Container maxWidth="sm">
                    <InvestmentInfo parameters={parameters} setParameters={setParameters} results={mockedResults} />
                    <Box className={buttonBox}>
                        <Button
                            type={'submit'}
                            disabled={submitting}
                            variant={'contained'}
                            color={'primary'}
                            style={{borderRadius: 25}}
                            onClick={onSubmit}
                        >
                            SAVE TO PORTFOLIO
                        </Button>
                    </Box>
                </Container>
            </CurrencyContext.Provider>
        </React.Fragment>
    );
};
