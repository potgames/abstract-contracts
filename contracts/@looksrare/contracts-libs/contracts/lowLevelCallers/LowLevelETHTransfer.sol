// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Assembly constants
import {ETHTransferFail_error_selector, ETHTransferFail_error_length, Error_selector_offset} from "../constants/AssemblyConstants.sol";

contract LowLevelETHTransfer {
    function _transferETH(address _to, uint256 _amount) internal {
        (bool success, ) = _to.call{value: _amount}("");
        if (!success) {
            assembly {
                mstore(0x00, ETHTransferFail_error_selector)
                revert(Error_selector_offset, ETHTransferFail_error_length)
            }
        }
    }
}