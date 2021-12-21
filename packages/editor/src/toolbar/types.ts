import React from 'react';

export type ToolbarItem = {
    component: React.Component;
    isSticky?: boolean;
    isRight?: boolean;
}