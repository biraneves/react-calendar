import React from "react";
import { Box, Icon, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { formatMonth, addMonths } from "./dateFunctions";
import { UserMenu } from "./UserMenu";

interface ICalendarHeaderProps {
    month: string;
}

export const CalendarHeader = React.memo(
    function (props: ICalendarHeaderProps) {
        const { month } = props;
        return (
            <Box display="flex" alignItems="center" padding="8px 16px">
                <Box>
                    <IconButton aria-label="Mês anterior" component={Link} to={'/calendar/' + addMonths(month, -1)}>
                        <Icon>chevron_left</Icon>
                    </IconButton>
                    <IconButton aria-label="Próximo mês" component={Link} to={'/calendar/' + addMonths(month, +1)}>
                        <Icon>chevron_right</Icon>
                    </IconButton>
                </Box>
                <Box flex="1" component="h3" marginLeft="16px">{ formatMonth(month) }</Box>
                <UserMenu />
            </Box>
        );
    }
);
