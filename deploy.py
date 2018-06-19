#!/usr/bin/python2.7
# deploy the IDE by moving the project structure to the deploy dir

import subprocess
import shlex
import shutil
from filecmp import dircmp
from distutils.dir_util import copy_tree
import os

def pushToGhPages():
    command = "git subtree push --prefix=deploy origin gh-pages"

def copy_and_overwrite(from_path, to_path):
    if os.path.exists(to_path):
        shutil.rmtree(to_path)
    shutil.copytree(from_path, to_path)

def copyFiles():
    #remove js and css dirs
    copy_and_overwrite('css', 'deploy/css')
    copy_and_overwrite('js/blockly/media', 'deploy/js/blockly/media')

    shutil.copy2('index.html', 'deploy/index.html')
    shutil.copy2('js/ide_compressed.js', 'deploy/js/')
    shutil.copy2('js/notification.js', 'deploy/js/')

    print "\nThe deploy directory now looks like:\n"
    path = 'deploy'
    for path, dirs, files in os.walk(path):
        print path
        for f in files:
            print f


if __name__ == "__main__":
    copyFiles()
