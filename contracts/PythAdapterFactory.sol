// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./PythAdapter.sol";

/**
 * @title PythAdapterFactory
 * @notice Factory contract for deploying PythAdapter instances
 * @author YOLO Games protocol team (👀,💎)
 */
contract PythAdapterFactory {
    event PythAdapterCreated(address pythAdapterAddress);

    /**
     * @notice Creates a new PythAdapter instance
     * @param _pyth Pyth price feed address
     * @param _priceId Pyth price feed ID
     * @param _description Pyth price feed description
     * @param _defaultAdmin The default admin of the contract
     */
    function createPythAdapter(
        address _pyth,
        bytes32 _priceId,
        string memory _description,
        address _defaultAdmin
    ) public {
        PythAdapter pythAdapter = new PythAdapter(
            _pyth,
            _priceId,
            _description,
            _defaultAdmin
        );
        emit PythAdapterCreated(address(pythAdapter));
    }

    /**
     * @notice Creates a new PythAdapter instance with a deterministic address
     * @param _pyth Pyth price feed address
     * @param _priceId Pyth price feed ID
     * @param _description Pyth price feed description
     * @param _defaultAdmin The default admin of the contract
     * @param _salt Salt for deterministic address generation
     */
    function create2PythAdapter(
        address _pyth,
        bytes32 _priceId,
        string memory _description,
        address _defaultAdmin,
        bytes32 _salt
    ) public {
        PythAdapter pythAdapter = new PythAdapter{salt: _salt}(
            _pyth,
            _priceId,
            _description,
            _defaultAdmin
        );
        emit PythAdapterCreated(address(pythAdapter));
    }

        /**
     * @notice Creates a new PythAdapter instance using assembly
     * @param _pyth Pyth price feed address
     * @param _priceId Pyth price feed ID
     * @param _description Pyth price feed description
     * @param _defaultAdmin The default admin of the contract
     */
    function createPythAdapterAssembly(
        address _pyth,
        bytes32 _priceId,
        string memory _description,
        address _defaultAdmin
    ) public {
        bytes memory bytecode = type(PythAdapter).creationCode;
        bytes memory constructorArgs = abi.encode(_pyth, _priceId, _description, _defaultAdmin);
        bytes memory deploymentBytecode = bytes.concat(bytecode, constructorArgs);
        
        address pythAdapter;
        assembly {
            pythAdapter := create(0, add(deploymentBytecode, 32), mload(deploymentBytecode))
        }
        
        emit PythAdapterCreated(pythAdapter);
    }

    /**
     * @notice Creates a new PythAdapter instance using assembly with deterministic address
     * @param _pyth Pyth price feed address
     * @param _priceId Pyth price feed ID
     * @param _description Pyth price feed description
     * @param _defaultAdmin The default admin of the contract
     * @param _salt Salt for deterministic address generation
     */
    function create2PythAdapterAssembly(
        address _pyth,
        bytes32 _priceId,
        string memory _description,
        address _defaultAdmin,
        bytes32 _salt
    ) public {
        bytes memory bytecode = type(PythAdapter).creationCode;
        bytes memory constructorArgs = abi.encode(_pyth, _priceId, _description, _defaultAdmin);
        bytes memory deploymentBytecode = bytes.concat(bytecode, constructorArgs);
        
        address pythAdapter;
        assembly {
            pythAdapter := create2(0, add(deploymentBytecode, 32), mload(deploymentBytecode), _salt)
        }
        
        emit PythAdapterCreated(pythAdapter);
    }
}