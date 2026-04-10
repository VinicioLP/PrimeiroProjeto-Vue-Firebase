#!/usr/bin/env python3
import os
import shutil

def cleanup():
    # Remove node_modules if exists
    if os.path.exists('node_modules'):
        shutil.rmtree('node_modules')
        print("Removed node_modules")

    # Remove dist if exists
    if os.path.exists('dist'):
        shutil.rmtree('dist')
        print("Removed dist")

    print("Cleanup completed")

if __name__ == "__main__":
    cleanup()