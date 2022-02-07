import {renderHook} from '@testing-library/react-hooks';
import {useConstructor} from "./useConstructor";

describe('useConstructor', () => {
    it('should call callback when calling useConstructor for the first time', () => {
        const callback = jest.fn();
        renderHook(() => useConstructor(callback));
        expect(callback).toBeCalledTimes(1);
    });
    it('should call callback only once when calling useConstructor twice', () => {
        const callback = jest.fn();
        const hook = renderHook(() => useConstructor(callback));
        hook.rerender();
        expect(callback).toBeCalledTimes(1);
    });
});
